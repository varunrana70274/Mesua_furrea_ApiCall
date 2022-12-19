/* eslint-disable prettier/prettier */
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text } from 'native-base';
import { Common } from '../../helpers/common';

export default function AllArrivels({ mainItem }) {

    const productImageCard = ({ item }) => {
        return (
            <TouchableOpacity >
                <View style={styles.productImage}>
                    <Image
                        alt="mImg"
                        source={{ uri: `${Common.fileUrl()}${item.fileUrls[0]}` }}
                        width='full'
                        height="full"
                        // borderRadius={8}
                        style={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                    />
                </View>
                <View style={styles.TextContainer}>
                    <View style={styles.width}>
                        {item?.descr.length > 20 ?
                            <Text style={styles.text}>
                                {`${item?.descr.slice(0, 19)}...`}
                            </Text>
                            :
                            <Text style={styles.text}>
                                {item?.descr}
                            </Text>}
                    </View>
                    <View >
                        <Text style={styles.textPrice} textDecorationLine="line-through">
                            ₹ {item?.price?.toLocaleString()}
                        </Text>
                        <Text style={styles.textPrice}>
                            {` ₹${item?.salePrice
                                ?.toFixed(0)
                                .toLocaleString()}`}
                        </Text>
                    </View>
                </View>
                {/* <View style={styles.absolute}>
                    {isClicked ?
                        <TouchableOpacity onPress={() => handleWishList()} >
                            <AntDesign name="heart" size={18} color="red" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => handleWishList()} >
                            <AntDesign name="hearto" size={18} color="grey" />
                        </TouchableOpacity>
                    }
                </View> */}
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <Text style={styles.HeadingText}>{mainItem?.descr}</Text>
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={mainItem?.productDTOs}
                    renderItem={productImageCard}
                    contentContainerStyle={{
                        marginBottom: 15,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productImage: {
        width: 170,
        height: 170,
        marginHorizontal: 8,
        // paddingHorizontal: 8,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5
    },
    TextContainer: {
        backgroundColor: 'white',
        marginTop: 5,
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 60,
        elevation: 5,
        marginBottom: 5
    },
    text: {
        fontSize: 15,
    },
    textPrice: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    width: {
        width: 80,
    },
    HeadingText: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
    absolute: {
        position: 'absolute',
        top: 10,
        left: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 3,
        borderRadius: 20,
    }
});
