<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreate;
use App\Http\Requests\StoreComment;
use App\Product;
use App\User;
use App\Comment;
use App\Like;
use App\Producttag;
use App\Materialproduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use phpDocumentor\Reflection\PseudoTypes\True_;
use phpDocumentor\Reflection\Types\Boolean;
use PhpParser\Node\Expr\Cast\String_;

class ProductController extends Controller
{
    public function __construct()
    {
        // 認証が必要
        $this->middleware('auth')->except(['index', 'show', 'search', 'tagsearch', 'likedrank', 'watchedrank']);
    }

    public function create(ProductCreate $request)
    {

        $product = DB::transaction(function () use ($request) {
            $product = new Product();
            $product->user_id = Auth::id();
            $product->productname = $request->productname;
            $product->linedot = $request->linedot;
            $product->alldot = $request->alldot;
            $product->uniquekey = $request->uniquekey;
            $product->ispublished = $request->ispublished;
            $product->colors = str_repeat("0_", $request->alldot);
            $product->save();

            $tags = $request->tags;
            if (!$tags == null) {
                foreach ($tags as $tag) {
                    $producttag = new Producttag();
                    $producttag->product_id = $product->id;
                    $producttag->message = $tag;
                    $producttag->save();
                }
            }
            return $product;
        });
        return $product;
    }

    public function update(Request $request)
    {
        $currentid = $request->currentProduct;
        $product = Product::with('user')->where('id', $currentid)->first();
        $color = "";
        $usedmaterial = "";
        foreach ($request['dots'] as $item) {
            $color = $color . $item['color'] . '_';
        }
        foreach ($request['usedMaterial'] as $item) {
            $usedmaterial = $usedmaterial . $item . '_';
        }
        $product->colors = $color;
        $product->usedmaterial = $usedmaterial;
        $product->save();
    }

    public function delete(String $id)
    {
        DB::transaction(function () use ($id) {
            Comment::where('product_id', $id)->delete();
            Like::where('product_id', $id)->delete();
            Product::destroy($id);
        });
    }

    public function list()
    {
        $userid = Auth::id();
        $listMaximumValue = 3;
        $list = Product::where('user_id', $userid)->orderBy('created_at', 'asc')->paginate($listMaximumValue);
        return response($list, 200);
    }

    public function current(Request $request)
    {
        $product = Product::with('user')->where('id', $request->id)->first();
        $productcolors = explode("_", $product->colors);
        return response($productcolors, 200);
    }

    public function index()
    {
        $products = Product::with('user', 'likes', 'producttags')->orderBy(Product::CREATED_AT, 'desc')->paginate();
        return $products;
    }

    public function show(String $id)
    {
        $product = Product::where('id', $id)->with(['user' => function ($query) {
            $query->with('userthumbnail');
        }, 'comments.user' => function ($query) {
            $query->with('userthumbnail');
        }, 'likes', 'producttags'])->first();
        Product::where('id', $id)->increment('countview');
        $usedMaterialList = explode("_", $product->usedmaterial);
        array_pop($usedMaterialList);
        $usedMaterials = Product::with('user')->whereIn('id', $usedMaterialList)->orderBy(Product::CREATED_AT, 'desc')->get();
        $product->usedmaterial = $usedMaterials;
        return $product ?? abort(404);
    }

    public function addComment(Product $product, StoreComment $request)
    {
        $comment = new Comment();
        $comment->content = $request->get('content');
        $comment->user_id = Auth::user()->id;
        $product->comments()->save($comment);

        $new_comment = Comment::where('id', $comment->id)->with(['user' => function ($query) {
            $query->with('userthumbnail');
        }])->first();
        return response($new_comment, 201);
    }

    public function likepreparation(string $id, bool $isLike)
    {
        $product = Product::where('id', $id)->with('likes')->first();
        if (!$product) {
            abort(404);
        }

        $product->likes()->detach(Auth::user()->id);
        if ($isLike) {
            $product->likes()->attach(Auth::user()->id);
        }
        return ["product_id" => $id];
    }

    public function like(string $id)
    {
        return $this->likepreparation($id, True);
    }

    public function unlike(string $id)
    {
        return $this->likepreparation($id, False);
    }

    public function search(Request $request)
    {
        $products = Product::search($request->keyword)->with('user', 'likes', 'producttags')->paginate();
        return $products;
    }

    public function tagsearch(Request $request)
    {
        $tag = $request->tag;
        $products = Product::whereIn('id', function ($query) use ($tag) {
            $query->from('producttags')->select('producttags.product_id')->where('producttags.message', $tag);
        })->with('user', 'likes', 'producttags')->paginate();
        return $products;
    }

    public function ordereachrank()
    {
        return Product::with('user', 'likes', 'producttags');
    }

    public function likedrank()
    {
        return $this->ordereachrank()->withCount('likes')->orderBy('likes_count', 'desc')->paginate();
    }

    public function watchedrank()
    {
        return $this->ordereachrank()->orderBy('countview', 'desc')->paginate();
    }

    public function materialadd(string $id)
    {
        $product = Product::where('id', $id)->with('materialproducts')->first();
        if (!$product) {
            abort(404);
        }

        $product->materialproducts()->detach(Auth::user()->id);
        $product->materialproducts()->attach(Auth::user()->id);
        return ["product_id" => $id];
    }

    public function materiallist()
    {
        $userid = Auth::id();
        $listIndex = Materialproduct::where('user_id', $userid)->orderBy('created_at', 'asc')->pluck('product_id');
        $list = Product::wherein('id', $listIndex)->with('user')->get();
        return response($list, 200);
    }
}
