package com.appleground.powerlifters.dto.object;

import com.mysql.cj.x.protobuf.MysqlxDatatypes.Scalar.String;

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
