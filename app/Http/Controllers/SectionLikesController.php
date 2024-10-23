<?php

namespace App\Http\Controllers;

use App\Models\UserSectionLike;
use Illuminate\Http\Request;

class SectionLikesController extends Controller
{
    public function tooglePSection(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standard_id' => 'required',
            'psection' => 'required',
            'like' => 'required',
            'parent' => 'required',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $psection = (array) $request->input('psection');
        $like = $request->input('like');
        $parent = $request->input('parent');

        if ($like == 1) {
            $this->saveLike($user, $comp_id, $standard_id, $psection, $parent);
        } else {
            $this->dislikePSection($user, $comp_id, $standard_id, $psection, $parent);
        }

        $like = $this->pSectionLiked($psection['id'], $user->id, $comp_id, $standard_id);

        if ($request->wantsJson()) {
            return response()->json(['like' => $like], 200);
        }
    }

    public function saveLike($user, $comp_id, $standard_id, $psection, $parent)
    {
        $aSection = $this->pSectionLiked($psection['id'], $user->id, $comp_id, $standard_id);

        if ($aSection && $aSection->liked == 0) {
            $aSection->liked = 1;
            $aSection->save();
        } elseif (!$aSection) {
            if (!$parent) {
                $this->likePSection($psection['id'], $user->id, $comp_id, $standard_id, $psection['parent']);
            } else {
                $this->likePSection($psection['id'], $user->id, $comp_id, $standard_id);
            }
        }

        if ($parent) {
            foreach ($psection['sections'] as $csection) {
                $childSection = $this->pSectionLiked($csection['id'], $user->id, $comp_id, $standard_id);
                if ($childSection && $childSection->liked === 0) {
                    $childSection->liked = 1;
                    $childSection->save();
                } elseif (!$childSection) {
                    $this->likePSection($csection['id'], $user->id, $comp_id, $standard_id, $csection['parent']);
                }
            }
        }
    }

    public function dislikePSection($user, $comp_id, $standard_id, $psection, $parent)
    {
        $aSection = $this->pSectionLiked($psection['id'], $user->id, $comp_id, $standard_id);

        if ($aSection && $aSection->liked == 1) {
            $aSection->liked = 0;
            $aSection->save();
        }

        if ($parent) {
            foreach ($psection['sections'] as $csection) {
                $childSection = $this->pSectionLiked($csection['id'], $user->id, $comp_id, $standard_id);
                if ($childSection && $childSection->liked === 1) {
                    $childSection->liked = 0;
                    $childSection->save();
                }
            }
        }
    }

    public function pSectionLiked($section_id, $user_id, $comp_id, $standard_id)
    {
        return UserSectionLike::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'user_id' => $user_id])->first();
    }

    public function likePSection($section_id, $user_id, $comp_id, $standard_id, $parent = null)
    {
        return UserSectionLike::create([
            'section_id' => $section_id,
            'user_id' => $user_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
        ]);
    }
}
