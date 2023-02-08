// 商品页详情相关配置
export interface IgoodsDesc {
    goods_id: string;
    imgUrl: string;
    swiper_img: {
        img: string;
    }[];
    goods_title: string;
    goods_desc: string;
    present_price: string;
    origin_price: string;
    views: string;
    kind: string;
    pub_time: string;
    is_collect: string;
    order_states: string;
}


// 商品发布相关配置
export interface pubgood {
    goods_contact: string,
    goods_desc: string,
    goods_id: string,
    goods_kind: string,
    goods_origin_price: string,
    goods_present_price: string,
    goods_pub_time: string,
    goods_status: string,
    goods_swiper_img1: string,
    goods_swiper_img2: string,
    goods_swiper_img3: string,
    goods_swiper_img4: string,
    goods_title: string,
    goods_title_img: string,
    goods_views: string,
    is_delgoods: string,
    pub_user_id: string,
}



// 所有商品相关配置
export interface Igoods {
    goods_id: number,
    goods_title: string,
    goods_desc: string,
    goods_origin_price: string,
    goods_present_price: string,
    goods_title_img: string,
    goods_contact: string,
    goods_pid: number,
    goods_kind: string,
    goods_pub_time: string,
    goods_views: string,
    is_delgoods: string,
    goods_status: string,
    pub_user_id: number,
    goods_swiper_img1: string,
    goods_swiper_img2: string,
    goods_swiper_img3: string,
    goods_swiper_img4: string,
}

// 商品分类相关配置
export interface Imenus {
    kind_id: number,
    goods_kind: string,
    value: string,
}


// 商品订单相关配置
export interface Iorder {
    order_id: number,
    is_delorder: string,
    order_create_time: string,
    buy_user_id: number,
    goods_id: number,
    goods_present_price: number,
    goods_title_img: string,
    goods_contact: string,
    goods_status: string,
    goods_title: string,
    goods_desc: string,
}