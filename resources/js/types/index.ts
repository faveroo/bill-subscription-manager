import type { auth } from './model/auth';
import type { flash } from './model/flash';

export type * from './auth';

export type PageProps = {
    flash: flash;
    auth: auth;
};

