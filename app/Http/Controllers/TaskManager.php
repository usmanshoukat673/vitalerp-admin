<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\TaskHelper;
use App\Models\FileManager\Document;
use App\Models\SectionControl;
use App\Models\Task;
use App\Models\TaskControls;
use App\Models\TaskDocuments;
use App\Models\TaskListItem;
use App\Models\TaskListType;
use App\Models\TaskUser;
use Illuminate\Http\Request;

class TaskManager extends Controller
{
    use TaskHelper, DocumentsHelper, CompanyCommons;

    public function index($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        // make sure user belongs to given company

        // Today Date

        // upcomming in next week

        // other greater than the upcomming date or expired

        $date = now();

        $today = now()->today();

        $upcommings = $date->addWeek()->toDateString() . ' 00:00:00';;

        $todays = Task::with('assign_to.user', 'sub_tasks', 'project', 'list_types.list_items')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
                'parent' => null
            ])
            ->whereDate('due_date', now()->today())
            ->latest()
            ->get();



        $this_weeks = Task::with('assign_to.user', 'sub_tasks', 'project', 'list_types.list_items')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
                'parent' => null
            ])
            ->whereDate('due_date', '>=', now()->tomorrow())
            ->whereDate('due_date', '<=', now()->addWeek())
            ->latest()
            ->get();

        $next_weeks = Task::with('assign_to.user', 'sub_tasks', 'project', 'list_types.list_items')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
                'parent' => null
            ])
            ->whereDate('due_date', '>=', now()->addWeek())
            ->whereDate('due_date', '<=', now()->addWeeks(2))
            ->latest()
            ->get();

        $upcomming = Task::with('assign_to.user', 'sub_tasks', 'project', 'list_types.list_items')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
                'parent' => null
            ])
            ->whereDate('due_date', '>=', now()->addWeeks(2))
            ->latest()
            ->get();

        $dues = Task::with('assign_to.user', 'sub_tasks', 'project', 'list_types.list_items')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
                'parent' => null
            ])
            ->whereDate('due_date', '<', now()->today())
            ->latest()
            ->get();

        // $other = Task::with('assign_to.user')
        //     ->with('documents.document')
        //     ->with('comments.user')
        //     ->with(['comments' => function ($query) {
        //         $query->where(['parent' => null]);
        //     }])
        //     ->where([
        //         'comp_id' => $comp_id
        //     ])
        //     ->where(function ($query) {
        //         $query->whereDate('due_date', '<', now()->today())
        //             ->orWhereDate('due_date', '>', now()->addWeek());
        //     })
        //     ->latest()
        //     ->get();

        // $todayss = Task::with('assign_to.user')
        //     ->with('documents.document')
        //     ->with('comments.user')
        //     ->with(['comments' => function ($query) {
        //         $query->where(['parent' => null]);
        //     }])
        //     ->where([
        //         'comp_id' => $comp_id
        //     ])
        //     ->latest()
        //     ->get();

        return response()->json([
            'todays' => $todays,
            'today' => $today,
            'upcomming' => $upcomming,
            'upcommings' => $upcommings,
            'this_weeks' => $this_weeks,
            'next_weeks' => $next_weeks,
            'dues' => $dues,
        ], 200);
    }

    public function show($id)
    {
        if (!$id) {
            abort(404);
        }

        $task = Task::with('assign_to.user')
            ->find($id);

        return response()->json(['task' => $task], 200);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'comp_id' => 'required',
            'assign_to' => 'required',
            'task_folder_id' => 'required',
            'project_id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $title = $request->input('title');

        $users = $request->input('assign_to') != '' ? explode(',', $request->input('assign_to')) : [];
        $documents = $request->input('documents') != '' ? explode(',', $request->input('documents')) : [];
        $controls = $request->input('controls') != '' ? explode(',', $request->input('controls')) : [];
        $sub_tasks = $request->input('sub_tasks') != '' ? explode(',', $request->input('sub_tasks')) : [];

        $priority = $request->input('priority');
        $due_date = $request->input('due_date');
        $overview = $request->input('overview');
        $files = $request->allFiles('files');
        $task_folder_id = $request->input('task_folder_id');
        $project_id = $request->input('project_id');
        $status = (($request->input('status') == '' || $request->input('status') == null) ? 'Pending' : $request->input('status'));

        $user = $request->user();

        $task = $user->tasks()->create([
            'title' => $title,
            'status' => $status,
            'project_id' => $project_id,
            'description' => $overview,
            'due_date' => $due_date,
            'priority' => $priority,
            'priority_text' => $this->_priorityText($priority),
            'comp_id' => $comp_id,
        ]);

        $this->storeActivity($comp_id, $user->id, "Created", 'task', 'Add Task', 'A new task has been created', $task->id, 'App\Models\Task');

        if (count($files) > 0) {
            $this->setDirectories($comp_id);

            foreach ($files as $file) {

                $name = $file->getClientOriginalName();
                $document = Document::create([
                    'name' => $name,
                    'size'       => $file->getSize(),
                    'ext'        => strtolower($file->getClientOriginalExtension()),
                    'comp_id' => $comp_id,
                    'parent' => $task_folder_id,
                    'type' => 'file',
                    'created_by' => $user->id
                ]);

                $task->documents()->create([
                    'document_id' => $document->id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);

                $this->storeActivity($comp_id, $user->id, "Uploaded", 'document', 'Add Task', 'A file uploaded', $document->id, 'App\Models\FileManager\Document', $document->id);
                $this->storeActivity($comp_id, $user->id, "Attached", 'document', 'Add Task', 'A file attached to task', $task->id, 'App\Models\Task', $document->id);

                $file->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);
            }
        }


        $this->__asignUsers($users, $task->id, $comp_id);

        if (count($documents) > 0) {
            foreach ($documents as $document_id) {
                $task->documents()->create([
                    'document_id' => $document_id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);
            }
        }

        if (count($sub_tasks) > 0) {
            foreach ($sub_tasks as $sub_task) {
                $sub_task = $user->tasks()->create([
                    'title' => $sub_task,
                    'project_id' => $project_id,
                    'due_date' => $due_date,
                    'priority' => $priority,
                    'priority_text' => $this->_priorityText($priority),
                    'comp_id' => $comp_id,
                    'parent' => $task->id,
                ]);

                $this->__asignUsers($users, $sub_task->id, $comp_id);
            }
        }

        if (count($controls) > 0) {
            foreach ($controls as $control) {
                $control = SectionControl::select('id', 'standard_section_id', 'standard_id')->find($control);
                if ($control) {
                    TaskControls::create([
                        'task_id' => $task->id,
                        'control_id' => $control->id,
                        'comp_id' => $comp_id,
                        'section_id' => $control->standard_section_id,
                        'standard_id' => $control->standard_id,
                        'assigned_by' => $user->id,
                    ]);
                }
            }
        }

        return response()->json(['task' => $task], 200);
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'task_id' => 'required|exists:tasks,id',
            'title' => 'required',
            'comp_id' => 'required',
            'assign_to' => 'required',
            'task_folder_id' => 'required',
            'project_id' => 'required',
        ]);

        $task_id = $request->input('task_id');
        $comp_id = $request->input('comp_id');
        $title = $request->input('title');

        $users = $request->input('assign_to') != '' ? explode(',', $request->input('assign_to')) : [];
        $documents = $request->input('documents') != '' ? explode(',', $request->input('documents')) : [];
        $deleted_items = $request->input('deleted_items') != '' ? explode(',', $request->input('deleted_items')) : [];
        $controls = $request->input('controls') != '' ? explode(',', $request->input('controls')) : [];
        $sub_tasks = $request->input('sub_tasks') != '' ? explode(',', $request->input('sub_tasks')) : [];

        $priority = $request->input('priority');
        $due_date = $request->input('due_date');
        $overview = $request->input('overview');
        $files = $request->allFiles('files');
        $task_folder_id = $request->input('task_folder_id');
        $project_id = $request->input('project_id');
        // $status = ($request->input('status') == '' ? 'Pending' : $request->input('status'));

        $user = $request->user();

        $task = Task::find($task_id);
        $task->title = $title;
        // $task->status = $status;
        $task->project_id = $project_id;
        $task->project_id = $project_id;
        $task->description = $overview;
        $task->due_date = $due_date;
        $task->priority = $priority;
        $task->priority_text = $this->_priorityText($priority);

        $task->save();

        $this->storeActivity($comp_id, $user->id, "Updated", 'task', 'Add Task', 'A task has been modified', $task->id, 'App\Models\Task');

        if (count($files) > 0) {
            $this->setDirectories($comp_id);

            foreach ($files as $file) {

                $name = $file->getClientOriginalName();
                $document = Document::create([
                    'name' => $name,
                    'size'       => $file->getSize(),
                    'ext'        => strtolower($file->getClientOriginalExtension()),
                    'comp_id' => $comp_id,
                    'parent' => $task_folder_id,
                    'type' => 'file',
                    'created_by' => $user->id
                ]);

                $task->documents()->create([
                    'document_id' => $document->id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);

                $this->storeActivity($comp_id, $user->id, "Uploaded", 'document', 'Add Task', 'A file uploaded', $document->id, 'App\Models\FileManager\Document', $document->id);
                $this->storeActivity($comp_id, $user->id, "Attached", 'document', 'Add Task', 'A file attached to task', $task->id, 'App\Models\Task', $document->id);

                $file->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);
            }
        }

        TaskUser::where([
            'task_id' => $task_id,
            'comp_id' => $comp_id,
        ])->delete();

        $this->__asignUsers($users, $task->id, $comp_id);

        if (count($documents) > 0) {
            foreach ($documents as $document_id) {
                $task->documents()->create([
                    'document_id' => $document_id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);
            }
        }

        if (count($deleted_items) > 0) {
            TaskListItem::whereIn('id', $deleted_items)->delete();
        }

        if (count($sub_tasks) > 0) {
            foreach ($sub_tasks as $sub_task) {
                $sub_task = $user->tasks()->create([
                    'title' => $sub_task,
                    'project_id' => $project_id,
                    'due_date' => $due_date,
                    'priority' => $priority,
                    'priority_text' => $this->_priorityText($priority),
                    'comp_id' => $comp_id,
                    'parent' => $task->id,
                ]);

                $this->__asignUsers($users, $sub_task->id, $comp_id);
            }
        }

        TaskControls::where([
            'task_id' => $task->id,
            'comp_id' => $comp_id,
        ])->delete();

        if ($controls && count($controls) > 0) {
            foreach ($controls as $ctrl) {

                $control = SectionControl::select('id', 'standard_section_id', 'standard_id')->find($ctrl);
                if ($control) {
                    TaskControls::create([
                        'task_id' => $task->id,
                        'control_id' => $control->id,
                        'comp_id' => $comp_id,
                        'section_id' => $control->standard_section_id,
                        'standard_id' => $control->standard_id,
                        'assigned_by' => $user->id,
                    ]);
                }
            }
        }

        return response()->json(['task' => $this->getTask($task->id)], 200);
    }

    private function getTask($task_id)
    {
        return Task::with('assign_to.user', 'sub_tasks', 'project', 'list_types.list_items')
        ->with('documents.document')
        ->with('comments.user')
        ->with(['comments' => function ($query) {
            $query->where(['parent' => null]);
        }])
        ->find($task_id);
    }

    public function delete(Request $request)
    {
        $this->validate($request, [
            'task_id' => 'required',
        ]);

        $task_id = $request->input('task_id');

        $task = Task::find($task_id);
        $user = $request->user();
        $task->deleted_by = $user->id;
        $task->save();
        $this->storeActivity($task->comp_id, $user->id, "Deleted", 'task', 'Delete Task', 'A task has been deleted', $task->id, 'App\Models\Task');
        $task->delete();
        return response()->json(['task' => $task], 200);
    }

    public function createSubTask(Request $request)
    {
        $this->validate($request, [
            'sub_tasks' => 'required',
            'task_id' => 'required',
        ]);

        $sub_tasks = $request->input('sub_tasks');
        $task_id = $request->input('task_id');

        $user = $request->user();

        $task = Task::find($task_id);

        if (!$task) {
            abort(404);
        }

        if (count($sub_tasks) > 0) {
            foreach ($sub_tasks as $sub_task) {
                $s_task = $user->tasks()->create([
                    'title' => $sub_task['title'],
                    'due_date' => $sub_task['due_date'],
                    'priority' => $sub_task['priority'],
                    'priority_text' => $this->_priorityText($sub_task['priority']),
                    'comp_id' => $task->comp_id,
                    'parent' => $task->id,
                ]);

                $this->__asignUsers($sub_task['assign_to'], $s_task->id, $task->comp_id);
            }
        }

        return response()->json([], 200);
    }

    public function createListTypes(Request $request)
    {
        $this->validate($request, [
            'list_types' => 'required',
            'task_id' => 'required',
        ]);

        $list_types = $request->input('list_types');
        $task_id = $request->input('task_id');

        $task = Task::find($task_id);

        if (!$task) {
            abort(404);
        }

        if (count($list_types) > 0) {
            foreach ($list_types as $list_type) {

                $lt = $task->list_types()->create([
                    'name' => $list_type['title'],
                    'type' => $list_type['type']
                ]);

                if (count($list_type['items']) > 0) {
                    foreach ($list_type['items'] as $item) {

                        $lt->list_items()->create([
                            'name' => $item,
                            'type' => $list_type['type'],
                            'task_id' => $task->id
                        ]);
                    }
                }
            }
        }

        return response()->json([], 200);
    }

    public function updateListTypes(Request $request)
    {
        $this->validate($request, [
            'list_types' => 'required',
            'task_id' => 'required',
        ]);

        $list_types = $request->input('list_types');
        $task_id = $request->input('task_id');

        $task = Task::find($task_id);

        if (!$task) {
            abort(404);
        }

        if (count($list_types) > 0) {
            foreach ($list_types as $list_type) {

                $lt = TaskListType::find($list_type['id']);

                if ($lt && count($list_type['list_items']) > 0) {
                    foreach ($list_type['list_items'] as $item) {
                         if($item['id'] > 0)
                         {
                            TaskListItem::where(['id' => $item['id']])
                            ->update(['name' => $item['name']]);
                         }
                         else{
                            $lt->list_items()->create([
                                'name' => $item['name'],
                                'type' => $item['type'],
                                'task_id' => $task->id
                            ]);
                         }
                    }
                }
                else{
                    $lt = $task->list_types()->create([
                        'name' => $list_type['title'],
                        'type' => $list_type['type']
                    ]);
    
                    if (count($list_type['list_items']) > 0) {
                        foreach ($list_type['list_items'] as $item) {
    
                            $lt->list_items()->create([
                                'name' => $item,
                                'type' => $list_type['type'],
                                'task_id' => $task->id
                            ]);
                        }
                    }
                }
            }
        }

        return response()->json([], 200);
    }

    public function listItemAnswer(Request $request)
    {
        $this->validate($request, [
            'list_item_id' => 'required',
        ]);
        $list_item_id = $request->input('list_item_id');

        if($item = TaskListItem::find($list_item_id));
        {
            $answer = $request->input('answer');
            $item->answer = $answer;
            $item->save();
            return response()->json([], 200);
        }
        
        return response()->json([], 404);
    }

    public function listItemAnswerRadio(Request $request)
    {
        $this->validate($request, [
            'the_checked' => 'required',
        ]);
        $list_item_id = $request->input('the_checked');
        $unchecked =(array) $request->input('unchecked');

        if($item = TaskListItem::find($list_item_id));
        {
            if(count($unchecked) > 0)
            {
                TaskListItem::whereIn('id', $unchecked)
                ->update(['answer' => 0]);
            }
            $item->answer = 1;
            $item->save();
            return response()->json([], 200);
        }
        
        return response()->json([], 404);
    }


    public function __asignUsers($users, $task_id, $comp_id)
    {
        if (count($users) > 0) {
            foreach ($users as $user_id) {
                TaskUser::create([
                    'task_id' => $task_id,
                    'user_id' => $user_id,
                    'comp_id' => $comp_id,
                ]);
            }
        }
    }

    public function attachments(Request $request)
    {
        $this->validate($request, [
            'task_id' => 'required|exists:tasks,id',
            'comp_id' => 'required',
            'task_folder_id' => 'required',
        ]);

        $task_id = $request->input('task_id');
        $comp_id = $request->input('comp_id');
        $files = $request->allFiles('files');
        $task_folder_id = $request->input('task_folder_id');

        $task = Task::find($task_id);
        $user = $request->user();

        if (count($files) > 0) {
            $this->setDirectories($comp_id);

            foreach ($files as $file) {

                $name = $file->getClientOriginalName();
                $document = Document::create([
                    'name' => $name,
                    'size'       => $file->getSize(),
                    'ext'        => strtolower($file->getClientOriginalExtension()),
                    'comp_id' => $comp_id,
                    'parent' => $task_folder_id,
                    'type' => 'file',
                    'created_by' => $user->id
                ]);

                $task->documents()->create([
                    'document_id' => $document->id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);

                $this->storeActivity($comp_id, $user->id, "Uploaded", 'document', 'Task Details', 'A file uploaded', $document->id, 'App\Models\FileManager\Document', $document->id);
                $this->storeActivity($comp_id, $user->id, "Attached", 'document', 'Task Details', 'A file attached to task', $task->id, 'App\Models\Task', $document->id);

                $file->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);
            }

            $documents = TaskDocuments::with('document')->where(['task_id' => $task->id, 'comp_id' => $comp_id])->get();

            return response()->json(['documents' => $documents], 200);
        }

        abort(404);
    }

    public function deleteAttachments(Request $request)
    {
        $this->validate($request, [
            'task_id' => 'required|exists:tasks,id',
            'comp_id' => 'required',
            'document_id' => 'required',
        ]);

        $task_id = $request->input('task_id');
        $comp_id = $request->input('comp_id');
        $document_id = $request->input('document_id');

        $user = $request->user();

        if ($this->documentChecks($document_id, $comp_id)) {
            return response()->json(['errors' => ['document' => ['This is document has assigned to multiple places.']]], 422);
        }

        if (TaskDocuments::where([
            'comp_id' => $comp_id,
            'document_id' => $document_id,
        ])
            ->where('task_id', '!=',  $task_id)
            ->first()
        ) {
            return response()->json(['errors' => ['document' => ['This is document has assigned to multiple places.']]], 422);
        }

        try {

            $document = Document::find($document_id);

            if ($document) {

                TaskDocuments::where([
                    'comp_id' => $document->comp_id,
                    'document_id' => $document->id,
                    'task_id' => $task_id,
                ])->delete();

                if ($document->type === 'file') {
                    $target_file = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.' . $document->ext;
                    if (file_exists($target_file)) {
                        unlink($target_file);
                    }
                }

                $this->storeGlobalActivity($document, $user, 'Deleted');

                $document->delete();

                return response()->json(['Deleted'], 200);
            }

            throw new \Exception("File not found", 1);
        } catch (\Throwable $th) {
            return response()->json(['errors' => [['document' => 'File not found!']]], 422);
        }
    }

    public function controls($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $standards = $this->__standards($comp_id);

        $controls = SectionControl::with(['standard' => function ($query) {
            $query->select('id', 'name', 'expand_name');
        }])
            ->whereIn('standard_id', $standards)
            ->select('id', 'number', 'standard_id', 'name')
            ->orderBy('name', 'asc')
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['controls' => $controls], 200);
        }

        return ['controls' => $controls];
    }

    public function documents($comp_id, $folder_id)
    {
        if (!$comp_id || !$folder_id) {
            abort(404);
        }

        $documents = Document::with('owner')->where([
            'parent' => $folder_id,
            'comp_id' => $comp_id,
        ])
            ->whereIn('type', ['file', 'document'])
            ->get();

        return ['documents' => $documents];
    }

    public function statusUpdate(Request $request)
    {
        $this->validate($request, [
            'task_id' => 'required|exists:tasks,id',
            'status' => 'required',
        ]);

        $status = $request->input('status');
        $task_id = $request->input('task_id');

        $user = $request->user();

        Task::where([
            'id' => $task_id
        ])
            ->update([
                'status' => $status,
                'modified_by' => $user->id,
            ]);

        return response()->json([], 200);
    }
}
