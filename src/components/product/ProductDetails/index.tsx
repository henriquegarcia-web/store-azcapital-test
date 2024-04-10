'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  Breadcrumb,
  ProductImageSlider,
  ProductMainInfos,
  ProductPrice,
  ProductVariations
} from '@/components'

import { ICategory, IProduct } from '@/@types/store'

interface IProductDetails {
  activeCategory: ICategory | null
  activeProduct: IProduct | null
}

const ProductDetails = ({ activeCategory, activeProduct }: IProductDetails) => {
  const [selectedColor, setSelectedColor] = useState(
    activeProduct?.variations ? activeProduct?.variations[0] : null
  )
  const [selectedSize, setSelectedSize] = useState(
    selectedColor && selectedColor.sizes ? selectedColor.sizes[0] : null
  )

  useEffect(() => {
    const productVariations = activeProduct?.variations

    if (productVariations && productVariations?.length > 0) {
      setSelectedColor(productVariations[0])
    }
  }, [activeProduct])

  const productMainInfos = useMemo(() => {
    if (!activeProduct) return null

    return {
      sku: activeProduct.sku,
      name: activeProduct.name,
      brand: activeProduct.brand,
      rating: {
        rate: activeProduct.rating,
        totalReviews: activeProduct.reviews.length
      }
    }
  }, [activeProduct])

  return (
    <div className="bg-white">
      <div className="flex flex-col gap-y-8 mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Detalhes do Produto</h2>

        <Breadcrumb category={activeCategory} />

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-2">
          <div className="flex flex-1">
            <ProductImageSlider imagesData={activeProduct?.images} />
          </div>
          <div className="flex flex-1 flex-col gap-y-6">
            <ProductMainInfos productMainInfos={productMainInfos} />
            <ProductPrice priceInfos={activeProduct?.price} />
            <ProductVariations
              productVariations={activeProduct?.variations}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
