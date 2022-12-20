<?php

namespace App\Traits;

use Image;

trait ImageTrait
{
    public function saveImage($image, $directoryName)
    {
        $imageName = $directoryName . '/' . time() . '.' . $image->getClientOriginalExtension();
        $imgFile = Image::make($image->getRealPath());
        $imgFile->resize(150, 150, function ($constraint) {
            $constraint->aspectRatio();
        })->save(storage_path('app/public/'  . $imageName));

        return $imageName;
    }

    public function getImageUrl($image)
    {
        if ($image) {
            return env('APP_URL') . 'storage/' . $image;
        }

        return null;
    }
}
