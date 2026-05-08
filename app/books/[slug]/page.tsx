import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MicOff, Mic } from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
// import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <div className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Card */}
        <div className="vapi-header-card bg-[#eadbb7] rounded-3xl p-8 flex gap-8 items-center shadow-sm">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || "/images/book-placeholder.png"}
              alt={book.title}
              width={120}
              height={180}
              className="vapi-cover-image !w-[120px] !h-auto"
              priority
            />
            <div className="vapi-mic-wrapper">
              <button
                className="vapi-mic-btn vapi-mic-btn-inactive shadow-md !w-[60px] !h-[60px] "
                title="Microphone toggle"
              >
                <MicOff className="size-7 text-[#212a3b]" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 justify-center">
            <div>
              <h1 className="text-4xl font-bold text-[#1e1e1e]">
                {book.title}
              </h1>

              <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Status */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                <span className="text-sm font-medium text-gray-700">Ready</span>
              </div>

              {/* Voice */}
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm text-gray-700">Voice: Daniel</span>
              </div>

              {/* Timer */}
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm font-medium text-gray-700">
                  0:00/15:00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="transcript-container min-h-[400px] bg-[#f4f4f4] rounded-3xl flex items-center justify-center">
          <div className="transcript-empty">
            <Mic className="size-12 text-[#212a3b] mb-4" />

            <h2 className="transcript-empty-text">No conversation yet</h2>

            <p className="transcript-empty-hint">
              Click the mic button above to start talking
            </p>
          </div>
        </div>
      </div>

      {/* <VapiControls book={book} /> */}
    </div>
  );
}
