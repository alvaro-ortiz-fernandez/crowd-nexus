export interface AuthData {
    email: string;
    password: string;
}

export enum LoginAttempt {
    Ok = 'Usuario autentificado correctamente.',
    InvalidFormat = 'Formato del email inválido.',
    NonExistentAccount = 'El usuario introducido no existe.',
    AccountDisabled = 'El usuario introducido se encuentra dado de baja.',
    BadCredentials = 'Credenciales inválidas.',
    Other = 'Se ha producido un error, por favor, inténtelo de nuevo.'
}

export enum FirebaseLoginError {
    InvalidEmail  = 'auth/invalid-email',
    UserNotFound  = 'auth/user-not-found',
    UserDisabled  = 'auth/user-disabled',
    WrongPassword = 'auth/wrong-password'
}

export enum RegisterAttempt {
    Ok = 'Cuenta de usuario creada correctamente.',
    InvalidEmail = 'Formato del email inválido.',
    AccountAlreadyExists = 'El usuario introducido ya existe.',
    WeakPassword = 'La contraseña introducida no es segura.',
    Other = 'Se ha producido un error, por favor, inténtelo de nuevo.'
}

export enum FirebaseRegisterError {
    InvalidEmail = 'auth/invalid-email',
    EmailInUse   = 'auth/email-already-in-use',
    WeakPassword = 'auth/weak-password',
    EmailRegistrationDisabled = 'auth/operation-not-allowed'
}

export enum RecoverAttempt {
    Ok = 'Por favor, verifique su correo electrónico y complete el formulario de restablecimiento de contraseña.',
    InvalidEmail = 'Formato del email inválido.',
    NonExistentAccount = 'El usuario introducido no existe.',
    Other = 'Se ha producido un error, por favor, inténtelo de nuevo.'
}

export enum FirebaseRecoverError {
    InvalidEmail = 'auth/invalid-email',
    UserNotFound = 'auth/user-not-found'
}

export function getLoginStatusCode(errorCode: string): LoginAttempt {
    switch (errorCode) {
        case FirebaseLoginError.InvalidEmail:  return LoginAttempt.InvalidFormat;
        case FirebaseLoginError.UserNotFound: return LoginAttempt.NonExistentAccount;
        case FirebaseLoginError.UserDisabled: return LoginAttempt.AccountDisabled;
        case FirebaseLoginError.WrongPassword: return LoginAttempt.BadCredentials;
        default: return LoginAttempt.Other;
    }
};

export function getRegistrationStatusCode(errorCode: string): RegisterAttempt {
    switch (errorCode) {
        case FirebaseRegisterError.InvalidEmail:  return RegisterAttempt.InvalidEmail;
        case FirebaseRegisterError.EmailInUse: return RegisterAttempt.AccountAlreadyExists;
        case FirebaseRegisterError.WeakPassword: return RegisterAttempt.WeakPassword;
        case FirebaseRegisterError.EmailRegistrationDisabled: return RegisterAttempt.Other;
        default: return RegisterAttempt.Other;
    }
};

export function getRecoverStatusCode(errorCode: string): RecoverAttempt {
    switch (errorCode) {
        case FirebaseRecoverError.InvalidEmail:  return RecoverAttempt.InvalidEmail;
        case FirebaseRecoverError.UserNotFound: return RecoverAttempt.NonExistentAccount;
        default: return RecoverAttempt.Other;
    }
};
