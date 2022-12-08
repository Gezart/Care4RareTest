// if (!process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT) {
//   throw new Error(`
//     Please provide a valid WordPress instance URL.
//     Add to your environment variables WORDPRESS_API_URL.
//   `)
// }

// /** @type {import('next').NextConfig} */
// module.exports = {
//   images: {
//     domains: [
//       `${process.env.NEXT_PUBLIC_WORDPRESS_API_NEXT.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0]}`, // Valid WP Image domain.
      
//     ],
//   },
// }