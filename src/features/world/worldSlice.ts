import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import initialState from "../../config/world";
import Block from "../../models/blocks";
import Point from "../../math/Point";
import Vector from "../../math/Vector";
import Entity from "../../models/entity";
import Surface from "../../models/level/Surface";
import Player from "../../models/Player";
import { PayloadLevelInit } from "../../types/reducers";

export const worldSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    initLevel(state, action: PayloadAction<any>) {
      const { time, lightLevel, spawnPos, blocks, entities, border }: PayloadLevelInit = action.payload;

      state.level = new Surface({
        time,
        lightLevel,
        spawnPos,
        blocks: blocks.map(block => new Block[block.id](block)),
        entities: entities.map(entity => new Entity[entity.id](entity)),
        border
      });
    },
    updateLightlevel(state, action: PayloadAction<any>) {
      state.level.lightLevel = action.payload;
    },
    updateStructure(state, action: PayloadAction<any>) {
      state.level.updateBlock(new Block[action.payload.id](action.payload));
    },
    updateEntity(state, action: PayloadAction<any>) {
      state.level.updateEntity(new Entity[action.payload.id](action.payload));
    },
    initPlayer(state, action: PayloadAction<any>) {
      const player = state.players.find((player) => player.uid === action.payload);

      if (player) {
          state.player = player;
      } else {
          console.error(`Player ${action.payload.uid} could NOT be found.`);
      }
    },
    movePlayer(state, action: PayloadAction<any>) {
      state.player.moveTo(new Point(action.payload.pos));
      state.player.motion = new Vector(action.payload.motion);
      state.player.rotation = action.payload.rotation;
    },
    initPlayers(state, action: PayloadAction<any>) {
      state.players = action.payload.map((player: Player) => new Player(player));
    },
    removePlayer(state, action: PayloadAction<any>) {
      const i = state.players.findIndex((player) => player.uid === action.payload);

      state.players.splice(i, 1);
    },
    addPlayer(state, action: PayloadAction<any>) {
      if (state.players.findIndex((player) => player.uid === action.payload.uid) === -1) {
        state.players.push(new Player(action.payload));
      }
    },
    movePlayerById(state, action: PayloadAction<any>) {
      const player = state.players.find((player) => player.uid === action.payload.uid);

      if (player) {
          player.moveTo(new Point(action.payload.pos));
          player.motion = new Vector(action.payload.motion);
          player.rotation = action.payload.rotation;
          player.isMotion = action.payload.isMotion;
      } else {
          console.error(`Player ${action.payload.uid} could NOT be found.`);
      }
    }
  },
});

export const {
  initLevel,
  updateEntity,
  updateLightlevel,
  updateStructure,
  initPlayer,
  movePlayer,
  initPlayers,
  removePlayer,
  addPlayer,
  movePlayerById
} = worldSlice.actions;

export const selectLevel = (state: RootState) => state.world.level;

export const selectPlayer = (state: RootState) => state.world.player;

export const selectPlayerInventory = (state: RootState) => state.world.player.inventory;

export const selectPlayers = (state: RootState) => state.world.players;

export default worldSlice.reducer;
