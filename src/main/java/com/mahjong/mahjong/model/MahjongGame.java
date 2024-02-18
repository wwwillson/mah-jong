package com.mahjong.mahjong.model;

import java.util.*;
import java.util.stream.Collectors;

public class MahjongGame {
    private List<Tile> playerTiles = new ArrayList<>();
    private List<Tile> allTiles = new ArrayList<>();
    private List<String> listenCards = new ArrayList<>();
    private HashMap<String,List<String>> HMlistenCards = new HashMap<>();
    private String message = "";
    private boolean WinningHand;

    public String getMessage() {
        return message;
    }
    public HashMap<String, List<String>> getHMlistenCards() {
        return HMlistenCards;
    }
    public MahjongGame() {
        initializeTiles();
    }

    private void initializeTiles() {
        for (int i = 1; i <= 9; i++) {
            allTiles.add(new Tile(i));
        }
    }

    public List<Tile> getAllTiles() {
        return allTiles;
    }

    public List<Tile> getPlayerTiles() {
        return playerTiles;
    }

    public void drawTile(Tile tile) {
        playerTiles.add(tile);
    }

    public List<String> getListenCards() {
        return listenCards.stream().distinct().sorted().collect(Collectors.toList());
    }
    public boolean isWinningHand() {
        List<String> tiles = new ArrayList<>();
        Collections.sort(playerTiles, Comparator.comparingInt(Tile::getNumber));
        for(Tile tile: playerTiles)
        {
            tiles.add(String.valueOf(tile.getNumber()));
        }

        if(tiles.size()%3==2){
            WinningHand = false;
            FindListenCards(tiles);
            listenCards.clear();
        }
        return WinningHand;
    }

    public boolean isListenHand() {
        List<String> tiles = new ArrayList<>();
        Collections.sort(playerTiles, Comparator.comparingInt(Tile::getNumber));
        for(Tile tile: playerTiles)
        {
            tiles.add(String.valueOf(tile.getNumber()));
        }

        if(tiles.size()%3==0){
            return false;
        }else if(tiles.size()%3==2){
            for (int i = 0; i < tiles.size(); i++) {
                if(HMlistenCards.containsKey(tiles.get(i)))
                    continue;

                List<String> playTiles = new ArrayList<>();
                for (int j = 0; j < tiles.size(); j++) {
                    if(j == i)
                        continue;
                    System.out.print("add  "+tiles.get(j));
                    playTiles.add(tiles.get(j));
                }
                FindListenCards(playTiles);
                if(listenCards.size()>0){
                    List<String> newTiles = new ArrayList<>();
                    newTiles.addAll(getListenCards());
                    HMlistenCards.put(tiles.get(i),newTiles);
                    listenCards.clear();
                }

            }
        }else{
            FindListenCards(tiles);
            if(listenCards.size()>0){
                HMlistenCards.put(null,getListenCards());
            }
        }

        if(HMlistenCards.size() > 0)
            return true;
        else
            return false;
    }
    public void FindListenCards(List<String> cardArray) {
        int card1, card2, card3;
        if (cardArray.size() == 1) {
            listenCards.add(cardArray.get(0));
        } else if (cardArray.size() == 2) {
            card1 = Integer.parseInt(cardArray.get(0));
            card2 = Integer.parseInt(cardArray.get(1));

            if (card1 == card2) {
                WinningHand = true;
                listenCards.add(cardArray.get(0));
            } else if (card1 + 1 == card2) {
                if (card1 != 1) {
                    listenCards.add(String.valueOf(card1 - 1));
                }
                if (card2 != 9) {
                    listenCards.add(String.valueOf(card1 + 2));
                }
            } else if (card1 + 2 == card2) {
                listenCards.add(String.valueOf(card1 + 1));
            }
        } else if (cardArray.size() > 3) {
            for (int i = 0; i < cardArray.size() - 2; i++) {
                card1 = Integer.parseInt(cardArray.get(i));
                card2 = Integer.parseInt(cardArray.get(i + 1));
                card3 = Integer.parseInt(cardArray.get(i + 2));

                if (card1 == card2 && card1 == card3) {
                    List<String> newArray = new ArrayList<>();
                    for (int x = 0; x < cardArray.size(); x++) {
                        if (x == i || x == i + 1 || x == i + 2) {
                            continue;
                        }
                        newArray.add(cardArray.get(x));
                    }
                    FindListenCards(newArray);
                    continue;
                }
                card2 = card1 + 1;
                card3 = card1 + 2;
                if (cardArray.contains(String.valueOf(card2)) && cardArray.contains(String.valueOf(card3))) {
                    List<String> newArray = new ArrayList<>();
                    for (int x = 0; x < cardArray.size(); x++) {
                        if (x == i || x == cardArray.indexOf(String.valueOf(card2)) || x == cardArray.indexOf(String.valueOf(card3))) {
                            continue;
                        }
                        newArray.add(cardArray.get(x));
                    }
                    FindListenCards(newArray);
                    continue;
                }
                if (cardArray.size() == 4){
                    int pair = 0;
                    if(card1 == Integer.parseInt(cardArray.get(i + 1)))
                        pair = card1;
                    if(i + 2 < cardArray.size() &&
                            Integer.parseInt(cardArray.get(i + 1)) == Integer.parseInt(cardArray.get(i + 2)))
                        pair = Integer.parseInt(cardArray.get(i + 2));
                    if (pair != 0)
                    {
                        List<String> newArray = new ArrayList<>();
                        for (int x = 0; x < cardArray.size(); x++) {
                            if (Integer.parseInt(cardArray.get(x)) == pair) {
                                continue;
                            }
                            newArray.add(cardArray.get(x));
                        }
                        FindListenCards(newArray);
                    }
                }
            }
        }
    }
//    public static void main(String[] args) {
//        MahjongGame mahjongGame = new MahjongGame();
//        List<String> cards = new ArrayList<>();
//
//        cards.add("1");
//        cards.add("1");
//        cards.add("1");
//        cards.add("2");
//        mahjongGame.FindListenCards(cards);
//        System.out.println(mahjongGame.getListenCards());
//    }
}
