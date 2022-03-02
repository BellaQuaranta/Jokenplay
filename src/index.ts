import { signUp } from './endpoints/signUp';
import { app } from './app';

app.post("/signUp", signUp)
