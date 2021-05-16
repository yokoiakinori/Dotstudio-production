<?php

namespace Tests\Feature;

use App\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class ProductListApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function AllProductsListReturn()
    {
        $product_count = 5;
        factory(Product::class, $product_count)->create();

        $response = $this->json('GET', route('product.index'));

        $response->assertStatus(200)
            ->assertJsonCount($product_count, 'data');
    }
}
