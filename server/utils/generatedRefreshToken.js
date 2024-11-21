const generatedRefreshToken = async (userId) => {
    const token = await jwt.sign({ id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn: '30d' }
    )
    return token
}