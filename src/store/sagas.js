import { spawn } from "redux-saga/effects";
import weatherSaga from "../Features/Weather/Weather.saga.ts";

export default function* root() {
  yield spawn(weatherSaga);
}
