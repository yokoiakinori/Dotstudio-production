<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestrepliesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_replies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('author_id');
            $table->unsignedInteger('opponent_id');
            $table->unsignedInteger('request_id');
            $table->unsignedInteger('product_id');
            $table->text('comment');
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users');
            $table->foreign('opponent_id')->references('id')->on('users');
            $table->foreign('request_id')->references('id')->on('material_requests');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_replies');
    }
}
