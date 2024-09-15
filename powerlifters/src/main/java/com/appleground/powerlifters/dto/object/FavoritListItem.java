package com.appleground.powerlifters.dto.object;

import java.lang.String;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FavoritListItem {
    private String email;
    private String nickName;
    private String profileImage;
}
