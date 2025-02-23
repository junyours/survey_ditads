<?php

namespace App\Http\Controllers;

use App\Models\Response;
use App\Models\Survey;
use Illuminate\Http\Request;

class ViewerController extends Controller
{
    public function surveyList()
    {
        $surveys = Survey::whereHas('survey_assignment')
            ->withCount([
                'response' => function ($query) {
                    $query->whereHas('answer');
                }
            ])
            ->latest()
            ->get();

        return response()->json($surveys);
    }

    public function viewSurvey(Request $request)
    {
        $survey = Survey::where('id', $request->survey_id)
            ->withCount([
                'response' => function ($query) {
                    $query->whereHas('answer');
                }
            ])
            ->with('question.option')
            ->first();

        $responses = Response::select('id', 'survey_id')
            ->where('survey_id', $survey->id)
            ->with([
                'answer' => function ($query) {
                    $query->select('id', 'question_id', 'response_id', 'text');
                    $query->with([
                        'answer_option' => function ($query) {
                            $query->select('answer_id', 'option_id');
                        }
                    ]);
                },
            ])->get();

        return response()->json([
            'survey' => $survey,
            'responses' => $responses,
        ]);
    }
}
