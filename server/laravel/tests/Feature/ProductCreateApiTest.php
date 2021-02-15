<?php

namespace Tests\Feature;

use App\Product;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductCreateApiTest extends TestCase
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
    public function should_createdProduct()
    {
        $data = [
            'productname' => 'test product',
            'alldot' => 100,
            'linedot' => 10,
            'uniquekey' => '202101011341568q452RN9',
            'ispublished' => false
        ];

        $response = $this->actingAs($this->user)->json('POST', route('product.create'), $data);

        $product = Product::first();
        $this->assertEquals($data['productname'], $product->productname);

        $response
            ->assertStatus(201);
    }
}
