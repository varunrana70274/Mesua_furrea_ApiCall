/* eslint-disable prettier/prettier */
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebsiteService } from '../../services/WebsiteService';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Image } from 'native-base';
import { Common } from '../../helpers/common';

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
    // sliderList.map(item => console.log('`${Common.fileUrl()}${item.fileUrl}`', `${Common.fileUrl()}${item.fileUrl}`))
    // console.log('rana', sliderList);
    return (
        <View >
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
                            source={`${Common.fileUrl()}${item.fileUrl}`}
                            width={390}
                            // height={200}
                            // width="100%"
                            height={190}
                            alt={item.link}
                            style={styles.image}
                        />
                    </View>
                )}
            />
        </View>
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
