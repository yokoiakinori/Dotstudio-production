<?php

namespace Tests\Feature;

use App\User;
use App\MaterialRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RequestSubmitApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
    }
    /**
     * @test
     */
    public function should_submitRequest()
    {
        $data = [
            'title' => 'Request Test',
            'contents' => '猫のイラストが欲しいです。',
        ];

        $response = $this->actingAs($this->user)->json('POST', route('materialrequest.create'), $data);

        $product = MaterialRequest::first();
        $this->assertEquals($data['title'], $product->title);

        $response
            ->assertStatus(201);
    }
}
