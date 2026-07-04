<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
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
            'subject' => 'required',
            'semester' => 'required',
            'description' => 'nullable',
            'file' => 'required|file|mimes:pdf|max:10240',
        ]);

        $file_path = $request->file('file')->store('notes', 'public');

        $note = Note::create([
            'title' => $request->title,
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
}
