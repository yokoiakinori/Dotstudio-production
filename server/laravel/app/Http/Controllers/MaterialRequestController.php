<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest;
use App\MaterialRequest;
use App\RequestReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class MaterialRequestController extends Controller
{
    public function __construct()
    {
        // 認証が必要
        $this->middleware('auth')->except(['all', 'show', 'latest', 'current']);
    }

    public function create(StoreRequest $request)
    {
        $material_request = new MaterialRequest();
        $material_request->user_id = Auth::id();
        $material_request->title = $request->title;
        $material_request->contents = $request->contents;
        $material_request->save();
        return $material_request;
    }

    public function update(Request $request)
    {
        $currentid = $request->id;
        $material_request = MaterialRequest::with('user')->where('id', $currentid)->first();
        $material_request->title = $request->title;
        $material_request->contents = $request->contents;
        $material_request->save();
    }

    public function reply(Request $request)
    {
        $request_reply = new RequestReply();
        $request_reply->author_id = Auth::id();
        $request_reply->opponent_id = $request->opponent_id;
        $request_reply->request_id = $request->request_id;
        $request_reply->product_id = $request->product_id;
        $request_reply->comment = $request->comment;
        $request_reply->save();
        return $request_reply;
    }

    public function complete(string $id)
    {
        $material_request = MaterialRequest::where('id', $id)->first();
        $material_request->iscompleted = true;
        $material_request->save();
    }

    public function all()
    {
        $material_requests = MaterialRequest::with('user')->orderBy(MaterialRequest::CREATED_AT, 'desc')->paginate();
        return $material_requests;
    }

    public function latest()
    {
        $display_count = 5;
        $material_requests = MaterialRequest::orderBy(MaterialRequest::CREATED_AT, 'desc')->take($display_count)->get();
        return $material_requests;
    }

    public function current(String $id)
    {
        $material_request = MaterialRequest::where('id', $id)->with(['user' => function ($query) {
            $query->with('userthumbnail');
        }, 'requestreplies.product'])->first();
        return $material_request ?? abort(404);
    }
}
