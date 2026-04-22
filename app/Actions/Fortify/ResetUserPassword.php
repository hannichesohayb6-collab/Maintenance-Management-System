<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

class ResetUserPassword implements ResetsUserPasswords
{
    use PasswordValidationRules;

    /**
     * Validate and reset the user's forgotten password.
     *
     * @param  array<string, string>  $input
     */
    public function reset(User $user, array $input): void
    {
        // التحقق من صحة كلمة المرور الجديدة بناءً على القواعد المعرفة
        Validator::make($input, [
            'password' => $this->passwordRules(),
        ])->validate();

        // التعديل الأساسي: تحديث حقل password_hash بدلاً من الحقل الافتراضي
        $user->forceFill([
            'password_hash' => Hash::make($input['password']),
        ])->save();
    }
}