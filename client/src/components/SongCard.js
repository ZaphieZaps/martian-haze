import BuyButton from "./BuyButton";

function SongCard({ song, user }) {
  const hasPurchased = user.purchasedSongs.includes(song.id);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl">{song.title}</h2>

      {hasPurchased ? (
        <audio controls src={song.streamUrl} className="mt-2 w-full" />
      ) : (
        <BuyButton
          songId={song.id}
          songTitle={song.title}
          price={song.price}
          userId={user._id}
        />
      )}
    </div>
  );
}

export default SongCard;
