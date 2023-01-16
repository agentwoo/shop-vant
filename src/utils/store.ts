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