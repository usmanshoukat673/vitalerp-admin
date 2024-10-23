<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\TaskHelper;
use App\Models\FileManager\Document;
use App\Models\Project;
use App\Models\ProjectDocuments;
use App\Models\ProjectUsers;
use App\Models\Task;
use App\Models\UserCompanies;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx\Rels;

class ProjectManager extends Controller
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

        $todays = Project::with('assign_to.user')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereDate('end_date', now()->today())
            ->latest()
            ->get();



        $this_weeks = Project::with('assign_to.user')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereDate('end_date', '>=', now()->tomorrow())
            ->whereDate('end_date', '<=', now()->addWeek())
            ->latest()
            ->get();

        $next_weeks = Project::with('assign_to.user')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereDate('end_date', '>=', now()->addWeek())
            ->whereDate('end_date', '<=', now()->addWeeks(2))
            ->latest()
            ->get();

        $upcomming = Project::with('assign_to.user')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereDate('end_date', '>=', now()->addWeeks(2))
            ->latest()
            ->get();

        $dues = Project::with('assign_to.user')
            ->with('documents.document')
            ->with('comments.user')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereDate('end_date', '<', now()->today())
            ->latest()
            ->get();

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

    public function projects($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $projects = Project::with(['tasks', 'assign_to.user', 'subjects']);

        if ($comp_id == 'all') {
            $projects = $projects->whereIn('comp_id', $this->getAllCompanies(request()->user()->id));
        } else {
            $projects = $projects->where([
                'comp_id' => $comp_id,
            ]);
        }

        $projects = $projects->latest()
            ->get();

        return response()->json([
            'projects' => $projects,
        ], 200);
    }

    public function users($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $users = UserCompanies::select('user_id');

        if ($comp_id == 'all') {
            $users = $users->whereIn('comp_id', $this->getAllCompanies(request()->user()->id));
        } else {
            $users = $users->where([
                'comp_id' => $comp_id,
            ]);
        }

        $users = $users
            ->get()
            ->each->setAppends([])->count();

        return response()->json([
            'users' => $users,
        ], 200);
    }

    public function show($id)
    {
        if (!$id) {
            abort(404);
        }

        $project = Project::with('assign_to.user')
            ->find($id);

        return response()->json(['project' => $project], 200);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'comp_id' => 'required',
            'assign_to' => 'required',
            'project_folder_id' => 'required',
            'category_id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $title = $request->input('title');
        $url = $request->input('url');

        $users = $request->input('assign_to') != '' ? explode(',', $request->input('assign_to')) : [];
        $documents = $request->input('documents') != '' ? explode(',', $request->input('documents')) : [];

        $priority = $request->input('priority');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $overview = $request->input('overview');
        $files = $request->allFiles('files');
        $category_id = $request->input('category_id');
        $project_folder_id = $request->input('project_folder_id');

        $user = $request->user();

        $project = $user->projects()->create([
            'title' => $title,
            'url' => $url,
            'description' => $overview,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'priority' => $priority,
            'category_id' => $category_id,
            'priority_text' => $this->_priorityText($priority),
            'comp_id' => $comp_id,
        ]);

        $this->storeActivity($comp_id, $user->id, "Created", 'project', 'Add Project', 'A new project has been created', $project->id, 'App\Models\Project');

        if (count($files) > 0) {
            $this->setDirectories($comp_id);

            foreach ($files as $file) {

                $name = $file->getClientOriginalName();
                $document = Document::create([
                    'name' => $name,
                    'size'       => $file->getSize(),
                    'ext'        => strtolower($file->getClientOriginalExtension()),
                    'comp_id' => $comp_id,
                    'parent' => $project_folder_id,
                    'type' => 'file',
                    'created_by' => $user->id
                ]);

                $project->documents()->create([
                    'document_id' => $document->id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);

                $this->storeActivity($comp_id, $user->id, "Uploaded", 'document', 'Add Project', 'A file uploaded', $document->id, 'App\Models\FileManager\Document', $document->id);
                $this->storeActivity($comp_id, $user->id, "Attached", 'document', 'Add Project', 'A file attached to project', $project->id, 'App\Models\Project', $document->id);

                $file->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);
            }
        }


        $this->__asignUsers($users, $project->id, $comp_id);

        if (count($documents) > 0) {
            foreach ($documents as $document_id) {
                $project->documents()->create([
                    'document_id' => $document_id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);
            }
        }

        return response()->json(['project' => $project], 200);
    }

    public function __asignUsers($users, $project_id, $comp_id)
    {
        if (count($users) > 0) {
            foreach ($users as $user_id) {
                ProjectUsers::create([
                    'project_id' => $project_id,
                    'user_id' => $user_id,
                    'comp_id' => $comp_id,
                ]);
            }
        }
    }

    /**
     * Project Attachments/document/files
     *
     * @param Request $request
     * @return void
     */
    public function files(Request $request)
    {
        $this->validate($request, [
            'project_id' => 'required|exists:projects,id',
            'comp_id' => 'required',
        ]);

        $project_id = $request->input('project_id');
        $comp_id = $request->input('comp_id');

        $documents = ProjectDocuments::with('document')->where(['project_id' => $project_id, 'comp_id' => $comp_id])->get();

        return response()->json(['documents' => $documents], 200);
    }

    public function attachments(Request $request)
    {
        $this->validate($request, [
            'project_id' => 'required|exists:projects,id',
            'comp_id' => 'required',
            'project_folder_id' => 'required',
        ]);

        $project_id = $request->input('project_id');
        $comp_id = $request->input('comp_id');
        $files = $request->allFiles('files');
        $project_folder_id = $request->input('project_folder_id');

        $project = Project::find($project_id);
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
                    'parent' => $project_folder_id,
                    'type' => 'file',
                    'created_by' => $user->id
                ]);

                $project->documents()->create([
                    'document_id' => $document->id,
                    'attached_by' => $user->id,
                    'comp_id' => $comp_id,
                ]);

                $this->storeActivity($comp_id, $user->id, "Uploaded", 'document', 'Project Details', 'A file uploaded', $document->id, 'App\Models\FileManager\Document', $document->id);
                $this->storeActivity($comp_id, $user->id, "Attached", 'document', 'Project Details', 'A file attached to project', $project->id, 'App\Models\Project', $document->id);

                $file->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);
            }

            $documents = ProjectDocuments::with('document')->where(['project_id' => $project->id, 'comp_id' => $comp_id])->get();

            return response()->json(['documents' => $documents], 200);
        }

        abort(404);
    }

    public function deleteAttachments(Request $request)
    {
        $this->validate($request, [
            'project_id' => 'required|exists:projects,id',
            'comp_id' => 'required',
            'document_id' => 'required',
        ]);

        $project_id = $request->input('project_id');
        $comp_id = $request->input('comp_id');
        $document_id = $request->input('document_id');

        $user = $request->user();

        if ($this->documentChecks($document_id, $comp_id)) {
            return response()->json(['errors' => ['document' => ['This is document has assigned to multiple places.']]], 422);
        }

        if (ProjectDocuments::where([
            'comp_id' => $comp_id,
            'document_id' => $document_id,
        ])
            ->where('project_id', '!=',  $project_id)
            ->first()
        ) {
            return response()->json(['errors' => ['document' => ['This is document has assigned to multiple places.']]], 422);
        }

        try {

            $document = Document::find($document_id);

            if ($document) {

                ProjectDocuments::where([
                    'comp_id' => $document->comp_id,
                    'document_id' => $document->id,
                    'project_id' => $project_id,
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

    public function tasks(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $project_id = $request->input('project_id');

        $tasks = Task::with('assign_to.user', 'sub_tasks', 'project', 'comments.user', 'controls', 'list_types.list_items')
            ->with('documents.document')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }]);

        if ($comp_id == 'all') {
            $tasks = $tasks->whereIn('comp_id', $this->getAllCompanies(request()->user()->id));
        } else {
            $tasks = $tasks->where([
                'comp_id' => $comp_id
            ]);
        }


        if ($project_id > 0 && $project_id != 'all') {
            $tasks = $tasks->where(['project_id' => $project_id]);
        }

        if($project_id == '0')
        {
            $tasks = $tasks->where(['project_id' => null]);
        }

        $tasks = $tasks->get();

        return response()->json(['tasks' => $tasks], 200);
    }

    public function filteredTasks($comp_id, $project_id)
    {
        
        if (!$comp_id || !$project_id) {
            abort(404);
        }

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
                'project_id' => $project_id,
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
                'project_id' => $project_id,
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
                'project_id' => $project_id,
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
                'project_id' => $project_id,
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
                'project_id' => $project_id,
                'parent' => null
            ])
            ->whereDate('due_date', '<', now()->today())
            ->latest()
            ->get();

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

    public function task(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'task_id' => 'required|exists:tasks,id',
        ]);

        $comp_id = $request->input('comp_id');
        $task_id = $request->input('task_id');

        $task = Task::with('assign_to.user', 'sub_tasks', 'project', 'comments.user', 'controls', 'list_types.list_items')
            ->with('documents.document')
            ->with(['comments' => function ($query) {
                $query->where(['parent' => null]);
            }])
            ->where([
                'comp_id' => $comp_id
            ])->find($task_id);



        return response()->json(['task' => $task], 200);
    }
}
