package com.mahjong.mahjong.controller;
import com.mahjong.mahjong.model.MahjongGame;
import com.mahjong.mahjong.model.Tile;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.List;

@Controller
public class mahjongController {

    private MahjongGame mahjongGame;

    public mahjongController() {
        mahjongGame = new MahjongGame();
    }

    @GetMapping("/selectTile")
    public String selectImages(Model model) {

        mahjongGame = new MahjongGame();
        model.addAttribute("tiles", mahjongGame.getAllTiles());

        return "showMahjong";
    }

    @PostMapping("/processSelectedTile")
    public String processSelectedImages(@RequestParam(value = "selectedTile", required = false) String[] Tiles, Model model) {

        if (Tiles != null) {
            for (String Tile : Tiles) {
                mahjongGame.drawTile(new Tile(Integer.parseInt(Tile)));
            }
        }

        if (mahjongGame.isWinningHand()) {
            model.addAttribute("messages", "胡牌!");
        } else if (mahjongGame.isListenHand()){
            model.addAttribute("listenCards", mahjongGame.getHMlistenCards());
        } else{
            model.addAttribute("messages", "沒聽牌!");
        }

        model.addAttribute("selectedTiles", mahjongGame.getPlayerTiles());

        return "selectedImagesPage";
    }
}