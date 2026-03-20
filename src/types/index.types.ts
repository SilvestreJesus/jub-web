export interface ObservatoryDTO {
    observatory_id: string
    title: string
    description: string
    image_url: string
    metadata: Record<string, string>
    created_at: string
    updated_at: string
};

export interface ProductXDTO {
    product_id: string
    name: string
    description: string
    tags: string[]
    attributes: string[]
    created_at: string
    updated_at: string
}

export interface SearchQueryDTO {
    query: string
}