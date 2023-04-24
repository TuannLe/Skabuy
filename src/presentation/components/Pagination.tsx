import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { COLOR } from '../constants'

const Pagination = ({
    totalProducts,
    productsPerPage,
    setCurrentPage,
    currentPage,
}: any) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pages.push(i);
    }

    return (
        <View style={tw`flex flex-row items-center justify-center`}>
            {pages.map((page, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => setCurrentPage(page)}
                        key={index}
                        style={tw`${page === currentPage ? `bg-[${COLOR.PRIMARY}]` : ""} px-3.5 rounded py-2 border border-slate-200 mx-1`}
                    >
                        <Text style={tw`${page === currentPage ? `text-white` : `text-[${COLOR.PRIMARY}]`} text-base`}>{page}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default Pagination;
