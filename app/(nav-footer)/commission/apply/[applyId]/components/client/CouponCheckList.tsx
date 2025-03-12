"use client";

import { useState } from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
} from "@mui/material";


interface Coupon {
    id: number;
    name: string;
    description: string;
}

interface CouponCheckListProps {
    coupons: Coupon[];
}

const CouponCheckList: React.FC<CouponCheckListProps> = ({ coupons }) => {
    const [checked, setChecked] = useState<number[]>([]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log("선택된 쿠폰 ID:", newChecked);
    };

    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {coupons.map((coupon) => {
                const labelId = `checkbox-list-label-${coupon.id}`;

                return (
                    <ListItem
                        key={coupon.id}
                        role={undefined}
                        dense
                        component="li"
                        onClick={handleToggle(coupon.id)}
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(coupon.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ "aria-labelledby": labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText
                            id={labelId}
                            primary={coupon.name}
                            secondary={coupon.description}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export default CouponCheckList;