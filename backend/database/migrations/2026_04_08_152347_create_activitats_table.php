<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('activitats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('viatge_id');
            $table->string('nom');
            $table->text('descripcio')->nullable();
            $table->date('data');
            $table->time('hora');
            $table->string('ubicacio');
            $table->timestamps();

            // Relació amb viatge
            $table->foreign('viatge_id')->references('id')->on('viatges')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('activitats');
    }
};