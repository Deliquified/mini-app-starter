export const uploadMetadataToIPFS = async (metadata: any) => {
    try {
      const formData = new FormData();
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });
      formData.append('file', metadataFile);

      const response = await fetch('/api/pinataPinFile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload metadata to IPFS');
      }

      const ipfsUrl = await response.json();
      return ipfsUrl;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  };