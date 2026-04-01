export type * from './auth';
import type { flash } from './model/flash';
import type { auth } from './model/auth';

export type PageProps = {
    flash: flash;
    auth: auth
}