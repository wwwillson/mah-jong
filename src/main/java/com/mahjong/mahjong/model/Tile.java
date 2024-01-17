package com.mahjong.mahjong.model;
public class Tile {
    private int number;

    // 默認構造函數
    public Tile() {
    }

    public Tile(int number) {
        this.number = number;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
