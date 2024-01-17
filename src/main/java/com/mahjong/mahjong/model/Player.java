package com.mahjong.mahjong.model;

import java.util.ArrayList;
import java.util.List;

public class Player {
    private List<Tile> tiles = new ArrayList<>();

    public void drawTile(Tile tile) {
        tiles.add(tile);
    }

    public List<Tile> getTiles() {
        return tiles;
    }
}
