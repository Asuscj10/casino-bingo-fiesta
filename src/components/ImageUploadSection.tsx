
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadSectionProps {
  onImageSelect: (imageUrl: string | null) => void;
  selectedImage: string | null;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({ 
  onImageSelect, 
  selectedImage 
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file: File) => {
    // Validaciones
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Formato no válido",
        description: "Solo se permiten archivos JPG, JPEG, PNG y GIF",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "Archivo muy grande",
        description: "El tamaño máximo permitido es 2MB",
        variant: "destructive",
      });
      return;
    }

    // Crear URL temporal para mostrar la imagen
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageSelect(imageUrl);
      toast({
        title: "¡Imagen cargada!",
        description: "La imagen se añadirá a los espacios vacíos de los cartones",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const removeImage = () => {
    onImageSelect(null);
    toast({
      title: "Imagen eliminada",
      description: "Los espacios vacíos aparecerán en blanco",
    });
  };

  return (
    <Card className="festival-bg-electric-blue festival-border-fuchsia border-2 shadow-2xl">
      <div className="p-6">
        <h3 className="text-lg font-bold festival-text-white mb-4 flex items-center">
          <ImageIcon className="mr-2 festival-text-lime" />
          Imagen para Espacios Vacíos
        </h3>
        
        <div className="space-y-4">
          <div className="festival-bg-vibrant-yellow p-4 rounded-lg">
            <h4 className="text-black font-bold mb-2">📋 Requisitos de la Imagen</h4>
            <ul className="text-black text-sm space-y-1">
              <li>• <strong>Formatos:</strong> JPG, JPEG, PNG, GIF</li>
              <li>• <strong>Tamaño máximo:</strong> 2MB</li>
              <li>• <strong>Recomendado:</strong> Imágenes cuadradas o rectangulares pequeñas</li>
              <li>• <strong>Resolución:</strong> Máximo 500x500px para mejor rendimiento</li>
            </ul>
          </div>

          {!selectedImage ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'festival-border-lime bg-green-50' 
                  : 'festival-border-fuchsia hover:festival-border-lime'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="mx-auto h-12 w-12 festival-text-fuchsia mb-4" />
              <p className="festival-text-white mb-4">
                Arrastra y suelta una imagen aquí, o haz clic para seleccionar
              </p>
              <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload">
                <Button 
                  type="button"
                  className="festival-bg-vibrant-yellow text-black font-bold hover:bg-yellow-400"
                  asChild
                >
                  <span>Seleccionar Imagen</span>
                </Button>
              </Label>
            </div>
          ) : (
            <div className="festival-border-lime border-2 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="festival-text-white font-bold">Imagen seleccionada:</span>
                <Button
                  onClick={removeImage}
                  variant="destructive"
                  size="sm"
                  className="festival-text-white"
                >
                  <X className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
              <div className="bg-white rounded-lg p-2 inline-block">
                <img 
                  src={selectedImage} 
                  alt="Imagen seleccionada" 
                  className="max-w-20 max-h-20 object-contain"
                />
              </div>
              <p className="festival-text-lime text-sm mt-2">
                ✅ Esta imagen aparecerá en los espacios vacíos de los cartones
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ImageUploadSection;
