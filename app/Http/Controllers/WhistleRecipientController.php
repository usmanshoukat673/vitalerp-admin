<?php

namespace App\Http\Controllers;

use App\Models\WhistleRecipient;
use Illuminate\Http\Request;

class WhistleRecipientController extends Controller
{
    public function add(Request $request)
    {
        $this->validate($request, [
            'whistle_id' => 'required',
            'name' => 'required',
            'email' => ['required', 'string', 'email', 'max:255']
        ]);

        $whistle_id = $request->input('whistle_id');
        $name = $request->input('name');
        $email = $request->input('email');

        if(WhistleRecipient::where(['whistle_id' => $whistle_id, 'email' => $email])->first())
        {
            return response()->json(['errors' => ["Email already exists"]], 401);
        }

        return WhistleRecipient::create([
            'whistle_id' => $whistle_id,
            'name' => $name, 
            'email' => $email,
            'created_by' => $request->user()->id
        ]);
    }

    public function delete($id)
    {
        $recipient = WhistleRecipient::findOrFail($id);
        $recipient->delete();

        return response('Delete', 200);
    }
}
