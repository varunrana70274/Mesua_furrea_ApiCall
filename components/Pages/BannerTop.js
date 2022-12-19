/* eslint-disable prettier/prettier */
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebsiteService } from '../../services/WebsiteService';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Image } from 'native-base';
import { Common } from '../../helpers/common';
// import { SliderBox } from 'react-native-image-slider-box';
export default function BannerTop() {
    const [sliderList, setSliderList] = useState([]);
    const getSlider = async () => {
        WebsiteService.slider()
            .then(res => {
                if (res.data.status === true) {
                    const response = res.data;
                    const data = response.object;
                    setSliderList(data);
                }
            })
            .catch(error => {
                console.log(error);
                ToastAndroid.error(error.response?.data?.message);
            });
    };
    useEffect(() => {
        if (sliderList.length === 0) {
            getSlider();
        }
    }, []);
    sliderList.map(item => console.log('items', `${Common.fileUrl()}${item.fileUrl}`))
    // console.log('rana', sliderList);
    return (
        <>
            <SwiperFlatList
                autoplay
                autoplayLoop
                autoplayLoopKeepAnimation
                index={0}
                // pagingEnabled
                // showPagination
                data={sliderList}
                renderItem={({ item }) => (
                    <View style={styles.Banner} key={item.id}>
                        <Image
                            source={{ uri: `${Common.fileUrl()}${item.fileUrl}` }}
                            width={370}
                            // height={200}
                            // width="100%"
                            height={190}
                            alt={item.link}
                            style={styles.image}
                        />
                    </View>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    Banner: {
        // margin: 10,
        paddingVertical: 15,
    },
    image: {
        borderRadius: 10,
        marginHorizontal: 10,
    },
});
