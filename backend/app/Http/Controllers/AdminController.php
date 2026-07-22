<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Note;
class AdminController extends Controller
{
    public function users()
    {
        $users = User::select(
            'id',
            'name',
            'email',
            'created_at'
        )->latest()->get();

        return response()->json($users);
    }
    public function destroy(Request $request, $id)
    {
        if ($request->user()->id == $id) {
            return response()->json([
                'message' => 'You cannot delete yourself.'
            ],403);
        }

        $user = User::findOrFail($id);

        Note::where('created_by', $user->name)->delete();

        $user->delete();

        return response()->json([
            'message'=>'User deleted.'
        ]);
    }
     public function notes()
    {
        return Note::latest()->get();
    }
    public function userNotes($id)
    {
        $user = User::findOrFail($id);

        $notes = Note::where('created_by', $user->name)
            ->latest()
            ->get();

        return response()->json([
            'user' => $user,
            'notes' => $notes
        ]);
    }
    public function deleteNote($id)
    {
        $note = Note::findOrFail($id);

        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully.'
        ]);
    }
}