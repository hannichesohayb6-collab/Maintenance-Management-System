<?php

use Inertia\Testing\AssertableInertia as Assert;

test('public pages render successfully', function (string $routeName, string $component) {
    $this->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->component($component));
})->with([
    'home' => ['home', 'public/home'],
    'about' => ['about', 'public/about'],
    'contact' => ['contact', 'public/contact'],
]);
