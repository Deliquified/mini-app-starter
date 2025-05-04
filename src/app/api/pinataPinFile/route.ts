import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/app/pinata/config"

// Pins a file to Pinata and returns the CID
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    
    console.log('📤 Uploading file to Pinata:', file.name);
    
    // Pinata offers public and private gateways.
    // For public files >>> gateways.public.file(cid) <<<
    // For private files >>> gateways.private.file(cid) <<<
    const uploadData = await pinata.upload.private.file(file);
    const url = uploadData.cid;
    
    console.log('✅ Successfully uploaded file to Pinata with hash:', url);
    
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.error('❌ Error in pinataPinFile:', e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}