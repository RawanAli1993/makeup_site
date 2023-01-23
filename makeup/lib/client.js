import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const Client = sanityClient({


    projectId: 'zt7vpa4x',
    dataset: 'production',
    apiVersion: '2023-01-13',

    useCdn: 'true',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN 
});

const Builder = imageUrlBuilder(Client);
export const urlFor =(source) => Builder.image(source);
