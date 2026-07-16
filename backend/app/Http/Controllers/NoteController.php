<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
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
    public function update(Request $request, Note $note)
    {
        if ($note->created_by !== $request->user()->name) {
            return response()->json([
                'message' => 'You are not authorized to edit this note.'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'faculty' => 'required|string',
            'subject' => 'required|string',
            'semester' => 'required',
            'description' => 'nullable|string',
            'file' => 'nullable|mimes:pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $note->title = $request->title;
        $note->faculty = $request->faculty;
        $note->subject = $request->subject;
        $note->semester = $request->semester;
        $note->description = $request->description;

        if ($request->hasFile('file')) {
            if ($note->file && Storage::disk('public')->exists($note->file)) {
                Storage::disk('public')->delete($note->file);
            }
            $note->file = $request->file('file')->store('notes', 'public');
        }

        $note->save();

        return response()->json([
            'message' => 'Note updated successfully.',
            'note' => $note,
        ]);
    }
    public function myNotes(Request $request)
    {
        $notes = Note::where('created_by', $request->user()->name)
            ->latest()
            ->get()
            ->map(function ($note) {
            $note->file_url = $note->file
                ? asset('storage/' . $note->file)
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