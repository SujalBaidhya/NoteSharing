<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Storage;
class NoteController extends Controller
{
    public function index(){
        return Note::latest()->get();//shorted based on the latest upload
        // return Note::orderBy('title', 'asc')->get();
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'faculty' => 'required|string',
            'created_by' => 'required|string',
            'subject' => 'required',
            'semester' => 'required|integer|between:1,8',
            'description' => 'nullable',
            'file' => 'required|file|mimes:pdf|max:10240',
        ]);

        $file_path = $request->file('file')->store('notes', 'public');

        $note = Note::create([
            'title' => $request->title,
            'faculty' => $request->faculty,
            'created_by'=>$request->user()->name,
            'subject' => $request->subject,
            'semester' => $request->semester,
            'description' => $request->description,
            'file' => $file_path,
        ]);

        return response()->json([
            'message' => 'Uploaded Successfully',
            'note' => $note,
        ]);
    }
    public function myNotes(Request $request)
    {
        $notes = Note::where('created_by', $request->user()->name)
            ->latest()
            ->get()
            ->map(function ($note) {
            $note->file_url = $note->file_path
                ? asset('storage/' . $note->file_path)
                : null;
            return $note;
        });
        return response()->json($notes);
    }
    public function destroy(Request $request, Note $note)
    {
        if ($note->created_by !== $request->user()->name) {
            return response()->json([
                'message' => 'You are not authorized to delete this note.'
            ], 403);
        }

        if ($note->file && Storage::disk('public')->exists($note->file)) {
            Storage::disk('public')->delete($note->file);
        }

        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully.'
        ]);
    }
}