import pygame
import json

# Define colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (200, 200, 200)

# Initialize Pygame
pygame.init()

# Set the width and height of the screen [width, height]
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Entity Relationship Diagram")

# Load JSON data
with open("tables.json") as f:
    data = json.load(f)

# Define functions to draw entities and relationships
def draw_entity(x, y, entity_name, attributes):
    font = pygame.font.SysFont(None, 24)
    text = font.render(entity_name, True, BLACK)
    screen.blit(text, (x, y))
    pygame.draw.rect(screen, WHITE, [x, y + 30, 200, 150], 2)
    for i, (attr, attr_type) in enumerate(attributes.items()):
        attr_text = f"{attr}: {attr_type}"
        text = font.render(attr_text, True, BLACK)
        screen.blit(text, (x + 10, y + 50 + i * 30))

def draw_relationship(x1, y1, x2, y2, text):
    pygame.draw.line(screen, BLACK, (x1, y1), (x2, y2), 2)
    font = pygame.font.SysFont(None, 24)
    text = font.render(text, True, BLACK)
    text_rect = text.get_rect(center=((x1 + x2) // 2, (y1 + y2) // 2))
    screen.blit(text, text_rect)

# Main loop
done = False
clock = pygame.time.Clock()

# Draw entities and relationships
x, y = 50, 50
entity_spacing = 300
relationship_spacing = 100
entity_positions = {}

for entity_name, entity_data in data.items():
    draw_entity(x, y, entity_name, entity_data["attributes_with_type"])
    entity_positions[entity_name] = (x, y)
    x += entity_spacing

for entity_name, entity_data in data.items():
    if "keys" in entity_data:
        for key, value in entity_data["keys"].items():
            if value:
                ref_entity_split = key.split("REFERENCES")
                if len(ref_entity_split) > 1:
                    ref_entity = ref_entity_split[1].strip().split("(")[0]
                    draw_relationship(*entity_positions[entity_name], *entity_positions[ref_entity], f"{entity_name} -> {ref_entity}")

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
    
    pygame.display.flip()
    clock.tick(60)

pygame.quit()

