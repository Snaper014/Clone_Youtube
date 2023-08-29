import { rest } from "msw";
import { URL } from "../config";
import { HomeData } from "./FakeData/DataHome";
import { NowTrend, MusicTrend, GamesTrend } from "./FakeData/DataTrend";
import { DataMusic } from "./FakeData/DataMusic";
import { DataActus } from "./FakeData/DataActus";
import { DataSport } from "./FakeData/DataSport";
import { DataMode } from "./FakeData/DataMode";
import { DataCultural } from "./FakeData/DataCultural";

const Handlers = [
  rest.get(`${URL}/home`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(HomeData));
  }),
  rest.get(`${URL}/trending`, (req, res, ctx) => {
    const type = req.url.searchParams.get("type");
    if (type === "now") {
      return res(ctx.status(200), ctx.json(NowTrend));
    }
    if (type === "music") {
      return res(ctx.status(200), ctx.json(MusicTrend));
    }
    if (type === "games") {
      return res(ctx.status(200), ctx.json(GamesTrend));
    }
  }),
  rest.get(`${URL}/channel/home`, (req, res, ctx) => {
    const id = req.url.searchParams.get("id");
    //musique
    if (id === "UC-9-kyTW8ZkZNDHQJ6FgpwQ") {
      return res(ctx.json(DataMusic));
    }
    //Actus
    if (id === "UCYfdidRxbB8Qhf0Nx7ioOYw") {
      return res(ctx.json(DataActus));
    }
    //sport
    if (id === "UCEgdi0XIXXZ-qJOFPf4JSKw") {
      return res(ctx.json(DataSport));
    }
    //Savoir et Culture
    if (id === "UCtFRv9O2AHqOZjjynzrv-xg") {
      return res(ctx.json(DataCultural));
    }
    //Mode
    if (id === "UCrpQ4p1Ql_hG8rKXIKM1MOQ") {
      return res(ctx.json(DataMode));
    }
  }),
];

export { Handlers };
