<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use DNS1D;

trait BarCodeTrait
{
    public function createBarCode()
    {
        $time = time();
        $fileName = 'barCode/' . $time . '.png';

        Storage::disk('public')->put(
            $fileName,
            base64_decode(
                DNS1D::getBarcodePNG($time, 'C39+')
            )
        );

        return $fileName;
    }
}
