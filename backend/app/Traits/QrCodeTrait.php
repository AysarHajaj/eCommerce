<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use DNS2D;

trait QrCodeTrait
{
    public function createQrCode()
    {
        $fileName = 'qrCode/' . time() . '.png';
        Storage::disk('public')->put(
            $fileName,
            base64_decode(
                DNS2D::getBarcodePNG("www.google.com", "QRCODE")
            )
        );

        return $fileName;
    }
}
