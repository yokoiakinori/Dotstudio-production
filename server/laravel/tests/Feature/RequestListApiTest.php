<?php

namespace Tests\Feature;

use App\MaterialRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RequestListApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function AllRequestsListReturn()
    {
        $request_count = 10;
        $latest_max = 5;
        factory(MaterialRequest::class, $request_count)->create();

        $response_all = $this->json('GET', route('materialrequest.all'));
        $response_all->assertStatus(200)->assertJsonCount($request_count, 'data');

        $response_latest = $this->json('GET', route('materialrequest.latest'));
        $response_latest->assertStatus(200)->assertJsonCount($latest_max);
    }
}
