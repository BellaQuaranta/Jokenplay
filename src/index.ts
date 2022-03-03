import { updateXP } from './endpoints/updateXP';
import { getRanking } from './endpoints/ranking';
import { getFeed } from './endpoints/feed';
import { login } from './endpoints/login';
import { signUp } from './endpoints/signUp';
import { app } from './app';
import { getProfile } from './endpoints/profile';

app.post("/signUp", signUp)
app.post("/login", login)
app.get("/user/profile", getProfile)
app.get("/user/ranking", getRanking)
app.get("/feed", getFeed)
app.put("/user/xp", updateXP)
