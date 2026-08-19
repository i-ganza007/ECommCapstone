"use client"

import { Drawer } from "@base-ui/react/drawer"

import type { Product } from "@/uicomps/ProductCard"

/**
 * Links every product card to the single <ProductDetailPanel /> mounted on the page.
 * The card is a detached <Drawer.Trigger>; whichever one is pressed hands its product
 * over as the drawer's payload, so one panel serves the whole grid.
 */
export const productDrawer = Drawer.createHandle<Product>()
